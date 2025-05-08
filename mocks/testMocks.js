import { jest } from '@jest/globals';

export const mockPush = jest.fn();

export const mockLaunches = [
  {
    id: '1',
    name: 'Falcon 1',
    date_utc: '2023-05-01T00:00:00Z',
    success: true,
    details: 'First successful launch.',
    failures: [],
    links: { patch: { small: '/falcon1.png' } },
  },
  {
    id: '2',
    name: 'Falcon 9',
    date_utc: '2023-06-01T00:00:00Z',
    success: false,
    details: null,
    failures: [{ reason: 'Engine failure' }],
    links: { patch: { small: '/falcon9.png' } },
  },
];

export const mockAxiosResponse = {
  data: {
    docs: mockLaunches,
    totalPages: 2,
  },
};

export const mockAxiosSinglePageResponse = {
  data: {
    docs: mockLaunches,
    totalPages: 1,
  },
};

export const mockAxiosErrorResponses = {
  500: { response: { status: 500 } },
  404: { response: { status: 404 } },
  400: { response: { status: 400 } },
};
