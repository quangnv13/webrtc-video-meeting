const protooPort = 443;

export function getProtooUrl({ roomId, peerId })
{
	const hostname = 'api-meet.quangnguyen.info';

	return `wss://${hostname}:${protooPort}/?roomId=${roomId}&peerId=${peerId}`;
}
