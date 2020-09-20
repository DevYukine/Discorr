/* eslint-disable @typescript-eslint/naming-convention */
export enum EventType {
	GRAB = 'Grab',
	DOWNLOAD = 'Download',
	RENAME = 'Rename',
	TEST = 'Test'
}

export interface Movie {
	id: string;
	title: string;
	releaseDate: string;
}

export interface RemoteMovie {
	tmdbId: number;
	imdbId: string;
	title: string;
	year: number;
}

export interface SonarrRelease {
	quality: string;
	qualityVersion: number;
	size: number;
}

export interface RadarrRelease extends SonarrRelease {
	releaseGroup: string;
	releaseTitle: string;
	indexer: string;
}

export interface File {
	id: string;
	relativePath: string;
	path: string;
	quality: string;
	qualityVersion: number;
}

export interface MovieFile extends File {
	releaseGroup: string;
}

export interface Series {
	id: string;
	title: string;
	path: string;
	tvdbId: string;
}

export interface Episode {
	id: number;
	episodeNumber: number;
	seasonNumber: number;
	title: string;
	airDate: string;
	airDateUtc: string;
	quality: string;
	qualityVersion: number;
}

export interface Payload {
	eventType: EventType;
}

export interface MoviePayload extends Payload {
	movie: Movie;
}

export interface RemoteMoviePayload extends Payload {
	remoteMovie: RemoteMovie;
}

export interface SeriesPayload extends Payload {
	series: Series;
}

export interface EpisodesPayload extends Payload {
	episodes: Episode[];
}

export interface RadarrGrabPayload extends MoviePayload, RemoteMoviePayload {
	release: RadarrRelease;
}

export interface RadarrDownloadPayload extends MoviePayload, RemoteMoviePayload {
	movieFile: MovieFile;
	isUpgrade: boolean;
}

export interface RadarrRenamePayload extends MoviePayload { }


export interface SonarrGrabPayload extends SeriesPayload, EpisodesPayload {
	release: SonarrRelease;
}

export interface SonarrDownloadPayload extends SeriesPayload, EpisodesPayload {
	episodeFile: File;
	isUpgrade: boolean;
}

export interface SonarrRenamePayload extends SeriesPayload {}

export type AnyRadarrPayload = RadarrGrabPayload | RadarrRenamePayload | RadarrDownloadPayload;

export type AnySonarrPayload = SonarrGrabPayload | SonarrRenamePayload | SonarrDownloadPayload;
