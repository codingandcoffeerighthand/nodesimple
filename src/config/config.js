import dotenv from "dotenv";
dotenv.config();

import joi from "joi";

const envVarsSchema = joi
	.object()
	.keys({
		PORT: joi.number().default(3000),
		MONGODB_URL: joi.string().required().description("Mongo DB url"),
	})
	.unknown();

function createConfig(configPath) {
	if (configPath) {
		dotenv.config({ path: configPath });
	} else {
		dotenv.config();
	}
	const { value: envVars, error } = envVarsSchema
		.prefs({ errors: { label: "key" } })
		.validate(process.env);

	if (error) {
		throw new Error(`Config validation error: ${error.message}`);
	}

	return {
		port: envVars.PORT,
		mongo: {
			url: envVars.MONGODB_URL,
		},
	};
}

export { createConfig };
