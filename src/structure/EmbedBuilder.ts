import { ColorResolvable } from 'discord.js';
import { EventType } from '../types';
import { defaultEmbed } from '../util';
import type { SonarrConvertContext, SonarrMultiEpisodeContext, SonarrSingleEpisodeContext } from './SonarrConverterUtil';

export class EmbedBuilder {
	private readonly _embed = defaultEmbed();

	public setQuality(quality: string, inline?: boolean) {
		this._embed.addField('Quality', quality, inline);
		return this;
	}

	public setTitle(title: string) {
		this._embed.addField('Title', title, true);
		return this;
	}

	public setAirDate(airDate: string) {
		this._embed.addField('Aired at', new Date(airDate).toDateString(), true);
		return this;
	}

	public setSeasons(seasons: [number, string][]) {
		for (const [season, episodes] of seasons) {
			this._embed.addField(`Season: ${season}`, `Episode(s): ${episodes}`, true);
		}
		return this;
	}

	public setColor(color: ColorResolvable) {
		this._embed.setColor(color);
		return this;
	}

	public setSingleEpisode(context: SonarrSingleEpisodeContext) {
		this._embed.setDescription(`${this.getEvent(context.eventType, context.isUpgrade)} Season ${context.episode.seasonNumber} Episode ${context.episode.episodeNumber} of **[${context.series.title}](http://www.thetvdb.com/?tab=series&id=${context.series.tvdbId})**`);
		this.setTitle(context.episode.title);
		this.setQuality(context.episode.quality, true);
		this.setAirDate(context.episode.airDateUtc);
		return this;
	}

	public setMultiEpisodes(context: SonarrMultiEpisodeContext) {
		this._embed.setDescription(`${this.getEvent(context.eventType, context.isUpgrade)} ${context.episodes.length} episodes of **[${context.series.title}](http://www.thetvdb.com/?tab=series&id=${context.series.tvdbId})**`);
		return this;
	}

	public setNoEpisodes(context: SonarrConvertContext) {
		this._embed.setDescription(`${this.getEvent(context.eventType, context.isUpgrade)} **[${context.series.title}](http://www.thetvdb.com/?tab=series&id=${context.series.tvdbId})**`);
		return this;
	}

	public get embed() {
		return this._embed;
	}

	private getEvent(eventType: EventType, isUpgrade = false) {
		if (isUpgrade) { return 'Upgraded'; }

		let event = '';

		switch (eventType) {
			case EventType.GRAB: { event = 'Grabbed'; break; }
			case EventType.DOWNLOAD: { event = 'Downloaded'; break; }
			case EventType.TEST: { throw new Error('Not implemented yet: EventType.TEST case'); }
			case EventType.RENAME: { throw new Error('Not implemented yet: EventType.RENAME case'); }
		}

		return event;
	}
}
