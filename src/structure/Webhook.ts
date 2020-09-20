import { MessageEmbed, WebhookClient } from 'discord.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { SONARR_AVATAR_URL: sonarrAvatarURL, RADARR_AVATAR_URL: radarrAvatarURL } = process.env;

export class Webhook {
	private readonly client: WebhookClient;

	public constructor(id: string, token: string) {
		this.client = new WebhookClient(id, token);
	}

	public sendSonarr(embed: MessageEmbed) {
		return this.client.send({ username: 'Sonarr', avatarURL: sonarrAvatarURL, embeds: [embed] });
	}

	public sendRadarr(embed: MessageEmbed) {
		return this.client.send({ username: 'Radarr', avatarURL: radarrAvatarURL, embeds: [embed] });
	}
}
