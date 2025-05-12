import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, phone, cpfCnpj, referralCode } = data;

    // Validar dados obrigatórios
    if (!email) {
      return NextResponse.json(
        { message: "Email é obrigatório" },
        { status: 400 },
      );
    }

    // Obter as variáveis de ambiente
    const apiUrl = process.env.ACTIVE_CAMPAIGN_API_URL;
    const apiKey = process.env.ACTIVE_CAMPAIGN_API_KEY;

    if (!apiUrl || !apiKey) {
      console.error("Variáveis de ambiente do ActiveCampaign não configuradas");
      return NextResponse.json(
        { message: "Erro de configuração do servidor" },
        { status: 500 },
      );
    }

    // Preparar os dados para o ActiveCampaign
    const contactData = {
      contact: {
        email,
        firstName,
        lastName,
        phone,
        fieldValues: [
          {
            field: "1", // Assumindo que o campo 1 é para CPF/CNPJ
            value: cpfCnpj,
          },
          {
            field: "2", // Assumindo que o campo 2 é para código de indicação
            value: referralCode || "",
          },
        ],
      },
    };

    // Enviar para o ActiveCampaign
    const response = await fetch(`${apiUrl}/api/3/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Token": apiKey,
      },
      body: JSON.stringify(contactData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Erro na resposta do ActiveCampaign:", responseData);
      return NextResponse.json(
        {
          message:
            "Erro ao cadastrar no ActiveCampaign: " +
            (responseData.message || "Erro desconhecido"),
        },
        { status: response.status },
      );
    }

    // Adicionar o contato à lista de afiliados (assumindo que a lista ID 1 é para afiliados)
    await fetch(`${apiUrl}/api/3/contactLists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Token": apiKey,
      },
      body: JSON.stringify({
        contactList: {
          list: 1, // ID da lista de afiliados
          contact: responseData.contact.id,
          status: 1, // 1 = ativo
        },
      }),
    });

    // Adicionar tag de afiliado
    await fetch(`${apiUrl}/api/3/contactTags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Token": apiKey,
      },
      body: JSON.stringify({
        contactTag: {
          contact: responseData.contact.id,
          tag: "afiliado", // Tag para identificar afiliados
        },
      }),
    });

    return NextResponse.json({
      success: true,
      message: "Contato adicionado com sucesso ao ActiveCampaign",
    });
  } catch (error) {
    console.error("Erro ao processar requisição:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
