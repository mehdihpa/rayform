import { rest } from "msw/lib";

export const handlers = [
  rest.get(
    "https://sit-rayform.saminray.com/api/forms",
    (req, res, context) => {
      return (
        res(context.status(200)),
        context.json([
          {
            name: "Form 1",
          },
          {
            name: "Form 2",
          },
          {
            name: "Form 3",
          },
        ])
      );
    }
  ),
];
