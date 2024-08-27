import { logger, task, wait } from "@trigger.dev/sdk/v3";

/**
 * Trigger background task that send order to
 * merchant
 */

export const sendOrderTask = task({
  id: "send-invoice",
  run: async (payload: any, { ctx }) => {
    logger.log("Send to merchant!", { payload, ctx });

    await wait.for({ minutes: 5 });

    return {
      message: "Order sent!",
    };
  },
});
