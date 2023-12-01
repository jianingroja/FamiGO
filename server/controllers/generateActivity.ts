// Use MOCK DATA (Remember to also change the GeneratorPage.tsx FE):
import openAIResponse from '../mocks/openAIGeneratedActivity.json';
import { Request, Response } from 'express';

export const generateActivity = async (req: Request, res: Response) => {
  const filtersBody: Object = req.body;

  const desiredFilters: any = Object.values(filtersBody).map(
    (filter) => filter.value
  );

  const activitiesArray = openAIResponse.content;

  const matchingActivity = activitiesArray.find((activity) => {
    return desiredFilters.every((filter: string) =>
      activity.filters.includes(filter)
    );
  });

  res.json({
    matchingActivity: matchingActivity || 'No match found in mockdata',
  });
};

//  Use OPENAI API (Remember to also change the GeneratorPage.tsx FE):

// import OpenAI from 'openai';
// import { Request, Response } from 'express';

// const openai = new OpenAI({
//   apiKey: process.env.VITE_OPENAI_API_KEY,
// });

// interface IResponseFromAPI {
//   filters: Object;
//   title: String;
//   materials: Array<String>;
//   description: String;
// }

// export const generateActivity = async (req: Request, res: Response) => {
//   const filtersBody = req.body;
//   const Topic = filtersBody.Topic.value;
//   const KidsNumber = filtersBody.KidsNumber.value;
//   const AgeRange = filtersBody.AgeRange.value;
//   const Difficulty = filtersBody.Difficulty.value;
//   const Place = filtersBody.Place.value;
//   const Duration = filtersBody.Duration.value;

//   console.log('filtersBody', filtersBody);

//   const requestToAPI = `'You are an assistant that design activities taking into account these filters:
//   - the topic of the activity: ${Topic};
//   - the number of kids that are going to play: ${KidsNumber};
//   - the age range of the kids that are going to play: ${AgeRange};
//   - the difficulty of the activity (beginner, intermediate or expert): ${Difficulty};
//   - the place (outside or inside): ${Place};
//   - the duration of the activity: ${Duration}

//   Your answer needs to be in json format and needs to be parseable with javascript:
//   {
//     filters,
//     title,
//     materials,
//     description,
//   }

//   Here's an explanation of each field of the response:

//   Give me an activity structured in these parts:
//   - filters: Just copy the value of the filters in an array with the quotation marks. For example: ["2", "1h < 2h"].
//   - title: Make sure it is in a string format.
//   - materials: Everything that is needed for the activity listed as an array, not an object.
//   - description: A short description of the activity that has to be maximum 500 characters long. Make sure it is in a string format.'`;

//   try {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: 'system', content: `${requestToAPI}` }],
//       model: 'gpt-4',
//       max_tokens: 500,
//     });

//     const content = completion.choices[0].message.content;
//     console.log(completion.choices[0].message.content);

//     if (content === null) {
//       throw new Error('Received null content from API');
//     }

//     const responseFromAPI: IResponseFromAPI = JSON.parse(content);
//     res.json(responseFromAPI);
//   } catch (err) {
//     console.error('Error:', err);
//   }
// };
