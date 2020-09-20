import type { Episode, EventType, Series, SonarrDownloadPayload, SonarrGrabPayload, SonarrRenamePayload } from '../types';
import { defaultEmbed, groupBy } from '../util';
import { EmbedBuilder } from './EmbedBuilder';

export interface SonarrConvertContext {
	series: Series;
	eventType: EventType;
	isUpgrade?: boolean;
}

export interface SonarrMultiEpisodeContext extends SonarrConvertContext {
	episodes: Episode[];
}

export interface SonarrSingleEpisodeContext extends SonarrConvertContext {
	episode: Episode;
}

export const grab = (payload: SonarrGrabPayload) => {
	const { episodes, release } = payload;

	const builder = new EmbedBuilder()
		.setColor('YELLOW');

	if (episodes.length === 1) {
		builder
			.setSingleEpisode({ episode: episodes[0], ...payload });
	} else {
		builder
			.setMultiEpisodes(payload)
			.setSeasons(chunkSeasons(episodes))
			.setQuality(release.quality);
	}

	return builder.embed;
};

export const download = (payload: SonarrDownloadPayload) => {
	const { episodes, episodeFile } = payload;

	const builder = new EmbedBuilder()
		.setColor('GREEN')
		.setMultiEpisodes(payload)
		.setSeasons(chunkSeasons(episodes))
		.setQuality(episodeFile.quality);

	return builder.embed;
};

export const rename = (payload: SonarrRenamePayload) => {
	const builder = new EmbedBuilder()
		.setColor('ORANGE')
		.setNoEpisodes(payload);

	return builder.embed;
};

export const test = () => defaultEmbed()
	.setTitle('Test successful')
	.setColor('BLUE');

const chunkSeasons = (episodes: Episode[]) => {
	const sorted = groupBy(episodes.map(episode => [episode.seasonNumber, episode.episodeNumber]), arr => arr[0]);
	const seasons: [number, string][] = [];

	for (const [season, episodeTuple] of sorted) {
		const sorted = episodeTuple
			.map(tuple => tuple[1])
			.reduce((result: number[][], episode) => {
				let last = result[result.length - 1];
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (last === undefined) {
					last = [];
					result[result.length - 1] = last;
				}
				if (episode === last[last.length - 1] + 1) {
					last.push(episode);
				} else {
					result.push([episode]);
				}
				return result;
			}, [])
			.map(episodeChunk => episodeChunk.length === 1 ? episodeChunk[0] : `${episodeChunk[0]} - ${episodeChunk[episodeChunk.length - 1]}`);

		seasons.push([season, sorted.join(', ')]);
	}

	return seasons;
};
