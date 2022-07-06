let protooPort = 4443;


export function getProtooUrl({ roomId, peerId })
{
	const hostname = window.location.hostname;

	return `wss://${hostname}:${protooPort}/?roomId=${roomId}&peerId=${peerId}`;
}
