// TMDB Authentication API Calls - Detailed Breakdown

import axios from "axios";

// Base configuration
const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key
const BASE_URL = "https://api.themoviedb.org/3";

// API client setup
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// ========== STEP 1: CREATE REQUEST TOKEN ==========

/**
 * API Call: GET /authentication/token/new
 * Purpose: Creates a temporary request token that expires in 60 minutes
 * Required: API key only
 */
const createRequestToken = async () => {
  try {
    console.log("🔑 STEP 1: Creating request token...");
    console.log("API Call: GET /authentication/token/new");
    console.log("Headers: None required");
    console.log("Params: api_key=" + API_KEY);

    const response = await apiClient.get("/authentication/token/new");

    console.log("✅ Response Status:", response.status);
    console.log("📄 Response Data:", JSON.stringify(response.data, null, 2));

    /* Expected Response:
    {
      "success": true,
      "expires_at": "2024-06-15 14:30:00 UTC",
      "request_token": "abc123def456ghi789..."
    }
    */

    return response.data;
  } catch (error) {
    console.error("❌ Step 1 Failed:", error.response?.data || error.message);
    throw error;
  }
};

// ========== STEP 2: VALIDATE TOKEN WITH LOGIN ==========

/**
 * API Call: POST /authentication/token/validate_with_login
 * Purpose: Validates the request token using user credentials
 * Required: request_token, username, password
 */
const validateRequestTokenWithLogin = async (
  username,
  password,
  requestToken
) => {
  try {
    console.log("\n🔐 STEP 2: Validating token with user credentials...");
    console.log("API Call: POST /authentication/token/validate_with_login");
    console.log("Headers: Content-Type: application/json");
    console.log("Params: api_key=" + API_KEY);

    const requestBody = {
      username: username,
      password: password,
      request_token: requestToken,
    };

    console.log("📤 Request Body:", JSON.stringify(requestBody, null, 2));

    const response = await apiClient.post(
      "/authentication/token/validate_with_login",
      requestBody
    );

    console.log("✅ Response Status:", response.status);
    console.log("📄 Response Data:", JSON.stringify(response.data, null, 2));

    /* Expected Response:
    {
      "success": true,
      "expires_at": "2024-06-15 14:30:00 UTC",
      "request_token": "abc123def456ghi789..."
    }
    */

    return response.data;
  } catch (error) {
    console.error("❌ Step 2 Failed:", error.response?.data || error.message);

    // Common error responses:
    if (error.response?.status === 401) {
      console.error("💡 Invalid username or password");
    } else if (error.response?.status === 404) {
      console.error("💡 Invalid request token");
    }

    throw error;
  }
};

// ========== STEP 3: CREATE SESSION ==========

/**
 * API Call: POST /authentication/session/new
 * Purpose: Creates a session ID from the validated request token
 * Required: validated request_token
 */
const createSession = async (validatedRequestToken) => {
  try {
    console.log("\n🎫 STEP 3: Creating session from validated token...");
    console.log("API Call: POST /authentication/session/new");
    console.log("Headers: Content-Type: application/json");
    console.log("Params: api_key=" + API_KEY);

    const requestBody = {
      request_token: validatedRequestToken,
    };

    console.log("📤 Request Body:", JSON.stringify(requestBody, null, 2));

    const response = await apiClient.post(
      "/authentication/session/new",
      requestBody
    );

    console.log("✅ Response Status:", response.status);
    console.log("📄 Response Data:", JSON.stringify(response.data, null, 2));

    /* Expected Response:
    {
      "success": true,
      "session_id": "xyz789abc123def456..."
    }
    */

    return response.data;
  } catch (error) {
    console.error("❌ Step 3 Failed:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.error("💡 Request token not validated or expired");
    }

    throw error;
  }
};

// ========== COMPLETE AUTHENTICATION FLOW ==========

const authenticateUserDetailed = async (username, password) => {
  try {
    console.log("🚀 Starting Complete TMDB Authentication Flow");
    console.log("==============================================\n");

    // STEP 1: Create Request Token
    const tokenData = await createRequestToken();
    const requestToken = tokenData.request_token;

    // STEP 2: Validate Token with Credentials
    const validatedTokenData = await validateRequestTokenWithLogin(
      username,
      password,
      requestToken
    );
    const validatedToken = validatedTokenData.request_token;

    // STEP 3: Create Session
    const sessionData = await createSession(validatedToken);
    const sessionId = sessionData.session_id;

    console.log("\n🎉 AUTHENTICATION SUCCESSFUL!");
    console.log("Session ID:", sessionId);
    console.log("⚠️  Keep this session ID secure - treat it like a password!");

    return {
      success: true,
      session_id: sessionId,
      request_token: requestToken,
    };
  } catch (error) {
    console.error("\n💥 AUTHENTICATION FAILED!");
    console.error("Error Details:", error.message);
    throw error;
  }
};

// ========== ALTERNATIVE: MANUAL APPROVAL FLOW ==========

/**
 * For web applications - redirect user to TMDB website for approval
 */
const manualApprovalFlow = async () => {
  try {
    console.log("🌐 Manual Approval Authentication Flow");
    console.log("=====================================\n");

    // Step 1: Create request token
    const tokenData = await createRequestToken();
    const requestToken = tokenData.request_token;

    // Step 2: Generate approval URL
    const approvalUrl = `https://www.themoviedb.org/authenticate/${requestToken}`;
    const callbackUrl = "https://yourwebsite.com/tmdb-callback";
    const fullApprovalUrl = `${approvalUrl}?redirect_to=${encodeURIComponent(
      callbackUrl
    )}`;

    console.log("🔗 User Approval Required!");
    console.log("Direct user to this URL:", fullApprovalUrl);
    console.log("\n📋 Instructions for user:");
    console.log("1. Click the approval URL");
    console.log("2. Log in to TMDB if not already logged in");
    console.log('3. Click "Allow" to approve the application');
    console.log("4. User will be redirected back to your callback URL");

    // Step 3: After user approves (this would be in your callback handler)
    console.log(
      "\n⚠️  After user approval, call createSession() with the same request token"
    );

    return {
      request_token: requestToken,
      approval_url: fullApprovalUrl,
      next_step: "User must approve, then call createSession(request_token)",
    };
  } catch (error) {
    console.error("❌ Manual approval flow failed:", error.message);
    throw error;
  }
};

// ========== GUEST SESSION (NO LOGIN REQUIRED) ==========

/**
 * API Call: POST /authentication/guest_session/new
 * Purpose: Creates a guest session for limited functionality
 * Required: API key only
 */
const createGuestSession = async () => {
  try {
    console.log("👤 Creating Guest Session (No Login Required)");
    console.log("==============================================\n");
    console.log("API Call: POST /authentication/guest_session/new");
    console.log("Headers: Content-Type: application/json");
    console.log("Params: api_key=" + API_KEY);
    console.log("Body: {} (empty)");

    const response = await apiClient.post("/authentication/guest_session/new");

    console.log("✅ Response Status:", response.status);
    console.log("📄 Response Data:", JSON.stringify(response.data, null, 2));

    /* Expected Response:
    {
      "success": true,
      "guest_session_id": "guest123abc456def...",
      "expires_at": "2024-06-15 14:30:00 UTC"
    }
    */

    console.log("\n📝 Guest Session Limitations:");
    console.log("- Can rate movies/TV shows");
    console.log("- Cannot access favorites or watchlists");
    console.log("- Cannot access account details");
    console.log("- Session expires in 24 hours");

    return response.data;
  } catch (error) {
    console.error("❌ Guest session creation failed:", error.message);
    throw error;
  }
};

// ========== HOW TO USE SESSION ID ==========

const usingSessionId = async (sessionId) => {
  try {
    console.log("🎯 Using Session ID for Account Operations");
    console.log("=========================================\n");

    // Example 1: Get account details
    console.log("📋 Example 1: Getting account details");
    console.log("API Call: GET /account?session_id=" + sessionId);

    const accountResponse = await apiClient.get("/account", {
      params: { session_id: sessionId },
    });

    console.log(
      "✅ Account Details:",
      JSON.stringify(accountResponse.data, null, 2)
    );

    // Example 2: Add to favorites
    const accountId = accountResponse.data.id;
    console.log("\n❤️  Example 2: Adding movie to favorites");
    console.log(
      `API Call: POST /account/${accountId}/favorite?session_id=${sessionId}`
    );

    const favoriteResponse = await apiClient.post(
      `/account/${accountId}/favorite`,
      {
        media_type: "movie",
        media_id: 550, // Fight Club
        favorite: true,
      },
      {
        params: { session_id: sessionId },
      }
    );

    console.log(
      "✅ Add to Favorites Result:",
      JSON.stringify(favoriteResponse.data, null, 2)
    );
  } catch (error) {
    console.error("❌ Using session ID failed:", error.message);
    throw error;
  }
};

// ========== DEMONSTRATION FUNCTIONS ==========

// Run detailed authentication example
const runDetailedExample = async () => {
  const USERNAME = "your_tmdb_username"; // Replace with actual username
  const PASSWORD = "your_tmdb_password"; // Replace with actual password

  try {
    // Method 1: Direct login authentication
    const authResult = await authenticateUserDetailed(USERNAME, PASSWORD);

    // Use the session ID
    await usingSessionId(authResult.session_id);
  } catch (error) {
    console.error("Example failed:", error.message);
  }
};

// Run manual approval example
const runManualExample = async () => {
  try {
    const approvalResult = await manualApprovalFlow();
    console.log("Approval result:", approvalResult);
  } catch (error) {
    console.error("Manual example failed:", error.message);
  }
};

// Run guest session example
const runGuestExample = async () => {
  try {
    const guestResult = await createGuestSession();
    console.log("Guest session created successfully");
  } catch (error) {
    console.error("Guest example failed:", error.message);
  }
};

// Export all functions
export {
  createRequestToken,
  validateRequestTokenWithLogin,
  createSession,
  authenticateUserDetailed,
  manualApprovalFlow,
  createGuestSession,
  usingSessionId,
  runDetailedExample,
  runManualExample,
  runGuestExample,
};

// Uncomment to test:
// runDetailedExample();
// runManualExample();
// runGuestExample();
