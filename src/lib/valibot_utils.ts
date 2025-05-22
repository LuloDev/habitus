import * as v from "valibot";

interface SuccessResult<TOutput> {
	status: "success";
	data: TOutput;
}

interface ErrorResult {
	status: "error";
	errors: Record<string, string | undefined>;
	values: Record<string, unknown>;
}

export async function parseWithValibot<TSchema extends v.BaseSchema>(
	formData: FormData,
	schema: TSchema,
): Promise<SuccessResult<v.InferOutput<TSchema>> | ErrorResult> {
	const data: Record<string, unknown> = {};
	formData.forEach((value, key) => {
		if (key in data) {
			if (Array.isArray(data[key])) {
				data[key].push(value);
			} else {
				data[key] = [data[key], value];
			}
		} else {
			data[key] = value;
		}
	});

	if (
		data.goalCount &&
		typeof data.goalCount === "string" &&
		data.goalCount.trim() !== ""
	) {
		const num = Number.parseInt(data.goalCount, 10);
		data.goalCount = Number.isNaN(num) ? data.goalCount : num;
	} else if (data.goalCount === "") {
		data.goalCount = undefined;
	}

	if (data.goalMeasure === "") {
		data.goalMeasure = undefined;
	}

	if (data.emoji === "") {
		data.emoji = undefined;
	}

	try {
		const parsedData = v.parse(schema, data);
		return { status: "success", data: parsedData };
	} catch (err) {
		if (err instanceof v.ValiError) {
			const fieldErrors: Record<string, string | undefined> = {};
			for (const issue of err.issues) {
				if (issue.path) {
					const pathKey = issue.path
						.map((p: { key: string }) => p.key)
						.join(".");
					fieldErrors[pathKey] = issue.message;
				}
			}
			return { status: "error", errors: fieldErrors, values: data };
		}
		console.error("ValiError on parsedData:", err);
		return {
			status: "error",
			errors: { _global: "Something went wrong" },
			values: data,
		};
	}
}
