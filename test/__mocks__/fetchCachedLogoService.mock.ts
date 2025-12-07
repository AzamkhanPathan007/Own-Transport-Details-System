export const mockFetchCachedLogoService = {
	getOTSCompanyLogo: jest
		.fn()
		.mockResolvedValue({ Company_logo: 'companyLogoBase64' }),
	getVARLCompanyLogo: jest
		.fn()
		.mockResolvedValue({ Company_logo: 'companyLogoBase64' }),
	getCustomLogo: jest
		.fn()
		.mockResolvedValue({ Custom_logo: 'companyLogoBase64' }),
	getSignature: jest
		.fn()
		.mockResolvedValue({ Custom_signature: 'companyLogoBase64' }),
};
