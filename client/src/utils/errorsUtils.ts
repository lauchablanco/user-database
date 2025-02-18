export const resolveErrorMessage = async (response: Response): Promise<string> => {
    let errorMessage = `Error ${response.status}: ${response.statusText}`;

    try {
        const errorData = await response.json();
        if (errorData.message) {
            errorMessage += ` - ${errorData.message}`;
        }
    } catch {
       return errorMessage // Si no se puede parsear JSON, dejamos el mensaje base
    }

    return errorMessage;
};