let controller = {};
// process.loadEnvFile();

import { createAssessment } from "../utils/createAssessment.js";
import PropertiesReader from "properties-reader";

const SAMPLE_THRESHOLD_SCORE = 0.5;

// Error message to be displayed in the client.
const Error = {
  INVALID_TOKEN: "Invalid token",
  ACTION_MISMATCH: "Action mismatch",
  SCORE_LESS_THAN_THRESHOLD: "Returned score less than threshold set",
};

// Label corresponding to assessment analysis.
const Label = {
  NOT_BAD: "Not Bad",
  BAD: "Bad",
};

// Parse config file and read available reCAPTCHA actions. All reCAPTCHA actions registered in the client
// should be mapped in the config file. This will be used to verify if the token obtained during assessment
// corresponds to the claimed action.
// const propertiesReader = require("properties-reader");

// const propertiesReader = PropertiesReader();
const PROPERTIES = PropertiesReader("config.properties");

const context = {
  project_id: process.env.GOOGLE_CLOUD_PROJECT,
  site_key: process.env.SITE_KEY,
};

controller.onCommentSubmit = async (req, res) => {
  try {
    // <!-- ATTENTION: reCAPTCHA Example (Server Part 1/2) Starts -->
    const recaptchaAction = PROPERTIES.get("recaptcha_action.comment");
    const assessmentResponse = await createAssessment(
      context.project_id,
      context.site_key,
      req.body.token,
      recaptchaAction
    );
    console.log(req.body.token);

    // Check if the token is valid, score is above threshold score and the action equals expected.
    // Take action based on the result (BAD / NOT_BAD).
    //
    // If result.label is NOT_BAD:
    // Check if comment has safe language and proceed to store in database.
    // let comment = req.body.comment
    // Business logic.
    //
    // If result.label is BAD:
    // Trigger email/ phone verification flow.
    const result = checkForBadAction(assessmentResponse, recaptchaAction);
    // <!-- ATTENTION: reCAPTCHA Example (Server Part 1/2) Ends -->

    // Below code is only used to send response to the client for demo purposes.
    // DO NOT send scores or other assessment response to the client.
    // Return the response.
    result.score =
      assessmentResponse.riskAnalysis && assessmentResponse.riskAnalysis.score
        ? assessmentResponse.riskAnalysis.score.toFixed(1)
        : (0.0).toFixed(1);

    res.json({
      data: result,
    });
  } catch (e) {
    res.json({
      data: {
        error_msg: e,
      },
    });
  }
};

const checkForBadAction = function (assessmentResponse, recaptchaAction) {
  let label = Label.NOT_BAD;
  let reason = "";

  // Classify the action as BAD if the token obtained from client is not valid.
  if (!assessmentResponse.tokenProperties.valid) {
    reason = Error.INVALID_TOKEN;
    label = Label.BAD;
  }

  // Classify the action as BAD if the returned recaptcha action doesn't match the expected.
  else if (assessmentResponse.tokenProperties.action !== recaptchaAction) {
    reason = Error.ACTION_MISMATCH;
    label = Label.BAD;
  }

  // Classify the action as BAD if the returned score is less than or equal to the threshold set.
  else if (assessmentResponse.riskAnalysis.score <= SAMPLE_THRESHOLD_SCORE) {
    reason = Error.SCORE_LESS_THAN_THRESHOLD;
    label = Label.BAD;
  }
  return { label: label, reason: reason };
};

export default controller;
