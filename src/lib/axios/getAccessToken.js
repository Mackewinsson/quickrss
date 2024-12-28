import { getAccessToken } from "@auth0/nextjs-auth0";

/**
 * Safely retrieves the Auth0 access token for the currently logged-in user.
 * Returns undefined if no valid session is found or an error occurs.
 */
export async function getMyAuth0Token(){
    try {
        // This will throw if the user isn't logged in or the token can't be retrieved
        const token = await getAccessToken();
        return token;
    } catch (error) {
        console.error("Error retrieving the Auth0 token:", error);
        return undefined;
    }
}
