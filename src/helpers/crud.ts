export const create = (schema: any, data: object): Promise<any> => {
	return new Promise(async (res, rej) => {
		await schema
			.create({
				data
			})
			.then((response: any) => res(response))
			.catch((err: any) => rej(err))
	})
}

export const createMany = (schema: any, data: object[]): Promise<any> => {
	return new Promise(async (res, rej) => {
		await schema
			.createMany({
				data
			})
			.then((response: any) => res(response))
			.catch((err: any) => rej(err))
	})
}

export const updateById = (
	schema: any,
	data: object,
	key: string = 'id',
	id: number | string | undefined
): Promise<any> => {
	return new Promise(async (res, rej) => {
		await schema
			.update({
				where: {
					[key]: id
				},
				data
			})
			.then((response: any) => res(response))
			.catch((err: any) => rej(err))
	})
}

export const deleteById = (
	schema: any,
	key: string = 'id',
	id: number | string | undefined
): Promise<any> => {
	return new Promise(async (res, rej) => {
		await schema
			.delete({
				where: {
					[key]: id
				}
			})
			.then((response: any) => res(response))
			.catch((err: any) => rej(err))
	})
}

export const getById = (
	schema: any,
	key: string = 'id',
	id: number | string | undefined
): Promise<any> => {
	return new Promise(async (res, rej) => {
		await schema
			.findUnique({
				where: {
					[key]: id
				}
			})
			.then((response: any) => res(response))
			.catch((err: any) => rej(err))
	})
}

export const getAll = (
	schema: any,
	take: number = 10,
	skip: number = 0
): Promise<any> => {
	return new Promise(async (res, rej) => {
		await schema
			.findMany({ take, skip })
			.then((response: any) => res(response))
			.catch((err: any) => rej(err))
	})
}

export const getAllById = (
	schema: any,
	key: string = 'id',
	id: number | string | undefined,
	take: number = 10,
	skip: number = 0
): Promise<any> => {
	return new Promise(async (res, rej) => {
		await schema
			.findMany({
				take,
				skip,
				where: {
					[key]: id
				}
			})
			.then((response: any) => res(response))
			.catch((err: any) => rej(err))
	})
}

export const getAllByQuery = (
	schema: any,
	queryObj: object
): Promise<any> => {
	return new Promise(async (res, rej) => {
		await schema
			.findMany({
				where: {
					...queryObj
				}
			})
			.then((response: any) => res(response))
			.catch((err: any) => rej(err))
	})
}
