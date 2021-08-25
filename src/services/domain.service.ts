import { DomainResponse } from '../interfaces/services.interface';

// Domain expiration check mock service (I didn't find any API without reqeust count limit, only 250 requests/hour)
export default (domain: string): Promise<DomainResponse> => new Promise((resolve, reject) => {
  try {
    const requestTimeout = Math.floor(Math.random() * 3000), // Random response time delay
      responseBody = { expired: Math.random() < 0.6 }; // Random result for domain expiration (60% probability of getting true)

    setTimeout(() => {
      return resolve(responseBody);
    }, requestTimeout);
  } catch (error) {
    return reject(error);
  }
});
