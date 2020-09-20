import { MessageEmbed } from 'discord.js';

export const groupBy = <T, K>(list: T[], fn: (item: T) => K): Map<K, T[]> => {
	const map = new Map();
	for (const item of list) {
		const key = fn(item);
		const collection = map.get(key);
		if (collection) {
			collection.push(item);
		} else {
			map.set(key, [item]);
		}
	}
	return map;
};


export const defaultEmbed = () => new MessageEmbed()
	.setTimestamp();
