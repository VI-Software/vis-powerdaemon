import * as core from "@actions/core";
import fetch from 'node-fetch';

const VALID_ACTIONS = ["start", "stop", "restart", "kill"];

function getValidatedInput(name: string, required = true): string {
    return core.getInput(name, { required }).trim();
}

function validatePowerAction(action: string): void {
    if (!VALID_ACTIONS.includes(action)) {
        throw new Error(`Invalid power action: ${action}. Must be one of: ${VALID_ACTIONS.join(", ")}`);
    }
}

async function executePowerAction(panelURL: string, apiKey: string, serverId: string, powerAction: string): Promise<void> {
    const requestUrl = new URL(`/api/client/servers/${serverId}/power`, panelURL);
    const requestOptions = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ signal: powerAction })
    };

    const response = await fetch(requestUrl.toString(), requestOptions);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error ${response.status}`);
    }

    core.info(`Server power action '${powerAction}' executed successfully.`);
}

async function run(): Promise<void> {
    try {
        const panelURL = getValidatedInput("PANEL_URL").replace(/\/+$/, "");
        const apiKey = getValidatedInput("API_KEY");
        const serverId = getValidatedInput("SERVER_ID");
        const powerAction = (getValidatedInput("POWER_ACTION") || "restart").toLowerCase();

        validatePowerAction(powerAction);
        await executePowerAction(panelURL, apiKey, serverId, powerAction);
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        } else {
            core.setFailed(String(error));
        }
    }
}