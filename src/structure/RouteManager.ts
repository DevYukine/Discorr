import { Context } from 'koa';
import type Router from 'koa-router';
import { Webhook } from './Webhook';
import { EventType, Payload, SonarrDownloadPayload, SonarrGrabPayload, SonarrRenamePayload } from '../types';
import { MessageEmbed } from 'discord.js';
import * as SonarrConverterUtils from './SonarrConverterUtil';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { WEBHOOK_ID: webhookId, WEBHOOK_TOKEN: webhookToken } = process.env;

export class RouteManager {
	private readonly webhookClient = new Webhook(webhookId!, webhookToken!);

	public constructor(private readonly router: Router) {}

	public registerRoutes() {
		this.router.register('/sonarr', ['post', 'put'], this.executeSonarr.bind(this));

		this.router.register('/radarr', ['post', 'put'], this.executeRadarr.bind(this));
	}

	private async executeSonarr(ctx: Context) {
		await this.webhookClient.sendSonarr(this.convertSonarr(ctx.request.body as Payload));
		this.success(ctx);
	}

	private async executeRadarr(ctx: Context) {
		await this.webhookClient.sendRadarr(this.convertRadarr(ctx.request.body as Payload));
		this.success(ctx);
	}

	private success(ctx: Context) {
		ctx.res.statusCode = 204;
	}

	private convertSonarr(payload: Payload): MessageEmbed {
		switch (payload.eventType) {
			case EventType.GRAB: { return SonarrConverterUtils.grab(payload as SonarrGrabPayload); }
			case EventType.DOWNLOAD: { return SonarrConverterUtils.download(payload as SonarrDownloadPayload); }
			case EventType.RENAME: { return SonarrConverterUtils.rename(payload as SonarrRenamePayload); }
			case EventType.TEST: { return SonarrConverterUtils.test(); }
		}
	}

	private convertRadarr(payload: Payload): MessageEmbed {
		const embed = new MessageEmbed();

		switch (payload.eventType) {
			case EventType.GRAB: { throw new Error('Not implemented yet: EventType.GRAB case'); }
			case EventType.DOWNLOAD: { throw new Error('Not implemented yet: EventType.DOWNLOAD case'); }
			case EventType.RENAME: { throw new Error('Not implemented yet: EventType.RENAME case'); }
			case EventType.TEST: { throw new Error('Not implemented yet: EventType.TEST case'); }
		}

		return embed;
	}
}
