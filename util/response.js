// Utility para crear respuestas consistentes (similar al ejemplo del profesor)
class ApiResponse {
    static success(data, message = "Success") {
        return {
            data: data,
            responseCode: 200,
            message: message
        };
    }

    static created(data, message = "Resource created successfully") {
        return {
            data: data,
            responseCode: 201,
            message: message
        };
    }

    static error(message = "An error occurred", code = 400) {
        return {
            responseCode: code,
            message: message
        };
    }

    static notFound(message = "Resource not found") {
        return {
            responseCode: 404,
            message: message
        };
    }
}

module.exports = ApiResponse;
