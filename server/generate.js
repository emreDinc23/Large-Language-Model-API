import openaiClient from "./api.js";

const generate = async (queryDescription) => {

  const daVinci = async (queryDescription) => {
    const response = await openaiClient.createCompletion({
      model: 'text-davinci-003',
      prompt: `Aşşağıda türkçe dil özellikleri ile yazılmış metinde ki türkçe dil kuralları hatalarını bulup düzenlenmiş halini verin.\n\n${queryDescription}`,
      max_tokens: 100,
      temperature: 0,
    });
    return response.data.choices[0].text;
  };

  const chatGPT = async (queryDescription) => {
    const message = [
      { role: "system", content: `You are correcting errors in texts written in the Turkish language` },
      { role: "user", content: `Turkish spelling and spelling in the following text written in the Turkish language\n\nüsküdarda Hilmi amcamın neyini beğenmediniz adamın bi cebindeki parayı çıkarıp vermediği kalmıştı öğrencilere yaptığı yardımın sonu yoktu ya biz mi bi şey kaçırdık` },
      { role: "assistant", content: "Üsküdar’da Hilmi amcamızın neyini beğenmediniz? Adamın bir cebindeki parayı çıkarıp vermediği kalmıştı, öğrencilere yaptığı yardımın sonu yoktu. Ya biz mi bir şey kaçırdık?" },
      { role: "user", content: `You are correcting errors in texts written in the Turkish language\n\n${queryDescription}` },
    ];
    const response = await openaiClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message,
    });

    return response.data.choices[0].message.content;
  }

  const duzenlenenMetin = await chatGPT(queryDescription);
  return duzenlenenMetin;

};

export default generate;
