# vis-powerdaemon

A workflow enabling your GitHub Action to send requests to a Pterodactyl panel-compatible API.

## Description

This GitHub Action allows you to execute power actions (start, stop, restart, kill) on a Pterodactyl Panel instance or compatible API.

## Usage

### Inputs

- `PANEL_URL`: URL of the Pterodactyl panel (required)
- `API_KEY`: Bearer token for panel authorization (required)
- `SERVER_ID`: ID of the server to perform actions on (required)
- `POWER_ACTION`: Power action to perform (options: "start", "stop", "restart", "kill"). Default is "restart".

### Action Configuration

```yaml
name: Server Power Control
on:
    push:
        branches:
            - main # Replace with the branch name
            
jobs:
  power-action:
    runs-on: ubuntu-latest
    steps:
      - name: Execute Power Action
        uses: VI-Software/vis-powerdaemon@v1.0
        with:
          PANEL_URL: ${{ secrets.PANEL_URL }}
          API_KEY: ${{ secrets.API_KEY }}
          SERVER_ID: ${{ secrets.SERVER_ID }}
          POWER_ACTION: restart  # Optional, defaults to "restart"
```

### Development

```bash
npm run build
```

### License 

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

