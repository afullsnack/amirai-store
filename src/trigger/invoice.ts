import { logger, task, wait } from "@trigger.dev/sdk/v3";

/**
 * Trigger background task that send-invoice to
 * customer
 */

export const sendInvoiceTask = task({
  id: "send-invoice",
  run: async (payload: any, { ctx }) => {
    logger.log("Send to customer!", { payload, ctx });

    await wait.for({ minutes: 5 });

    return {
      message: "Invoice sent!",
    };
  },
});
