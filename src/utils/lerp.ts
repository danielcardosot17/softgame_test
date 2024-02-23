export function lerp(
	initialValue: number,
	finalValue: number,
	totalTime: number,
	elapsedTime: number
): number {
	if (elapsedTime >= totalTime || totalTime <= 0 || elapsedTime <= 0) {
		return finalValue;
	}

	return initialValue + (finalValue - initialValue) * (elapsedTime / totalTime);
}
