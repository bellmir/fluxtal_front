export type CommonResType<DataType = any, ErrorDataType = any> =
	| {
			error: {
				code: string;
				response: string;
				message: string;
			};
			data?: ErrorDataType;
			success: false;
	  }
	| {
			data: DataType;
			success: true;
	  };
