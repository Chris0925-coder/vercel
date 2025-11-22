// const {RecaptchaEnterpriseServiceClient} =
//   require('@google-cloud/recaptcha-enterprise').v1;
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

/**
 * Create an assessment to analyze the risk of a UI action.
 * @param projectId: GCloud Project ID
 * @param recaptchaSiteKey: Site key obtained by registering a domain/app to use recaptcha services.
 * @param token: The token obtained from the client on passing the recaptchaSiteKey.
 * @param expectedAction: The expected action for this type of event.
 * @returns Assessment
 */
export async function createAssessment(
  projectId,
  recaptchaSiteKey,
  token,
  expectedAction
) {
  // <!-- ATTENTION: reCAPTCHA Example (Server Part 2/2) Starts -->
  const client = new RecaptchaEnterpriseServiceClient();

  // Build the assessment request.
  const [response] = await client.createAssessment({
    parent: `projects/${projectId}`,
    assessment: {
      // Set the properties of the event to be tracked.
      event: {
        siteKey: recaptchaSiteKey,
        token: token,
        expectedAction: expectedAction,
      },
    },
  });
  // <!-- ATTENTION: reCAPTCHA Example (Server Part 2/2) Ends -->
  return response;
}

// module.exports = {
//   createAssessment,
// };

// export default createAssessment;
