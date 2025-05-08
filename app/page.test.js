import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Home from './page';
import { useRouter } from 'next/navigation';
import {
  mockPush,
  mockAxiosResponse,
  mockAxiosSinglePageResponse,
  mockAxiosErrorResponses,
} from '../mocks/testMocks';
import { renderAsyncComponent } from '../mocks/test-utils';

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const getNextButton = () =>
  screen.getByRole('button', { name: 'forwardArrowButton' });
const getPrevButton = () =>
  screen.getByRole('button', { name: 'backArrowButton' });

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush });
  });

  test('renders launches correctly', async () => {
    axios.post.mockResolvedValue(mockAxiosResponse);

    await renderAsyncComponent(Home, { searchParams: { page: '1' } });

    expect(screen.getByText('Falcon 1')).toBeInTheDocument();
    expect(screen.getByText('Falcon 9')).toBeInTheDocument();
  });

  describe('Pagination', () => {
    test('When user clicks next button, it redirects to the next page', async () => {
      axios.post.mockResolvedValue(mockAxiosResponse);

      await renderAsyncComponent(Home, { searchParams: { page: '1' } });

      const nextButton = getNextButton();
      fireEvent.click(nextButton);

      expect(mockPush).toHaveBeenCalledWith('/?page=2');
    });

    test('When user clicks previous button, it redirects to the previous page', async () => {
      axios.post.mockResolvedValue(mockAxiosResponse);

      await renderAsyncComponent(Home, { searchParams: { page: '2' } });

      const prevButton = getPrevButton();
      fireEvent.click(prevButton);

      expect(mockPush).toHaveBeenCalledWith('/?page=1');
    });

    test('When user is on first page, previous button should be disabled and next button should be enabled', async () => {
      axios.post.mockResolvedValue(mockAxiosResponse);

      await renderAsyncComponent(Home, { searchParams: { page: '1' } });

      const prevButton = getPrevButton();
      expect(prevButton).toBeDisabled();

      const nextButton = getNextButton();
      expect(nextButton).not.toBeDisabled();
    });

    test('When user is on last page, previous button should be enabled and next button should be disabled', async () => {
      axios.post.mockResolvedValue(mockAxiosResponse);

      await renderAsyncComponent(Home, { searchParams: { page: '2' } });

      const nextButton = getNextButton();
      expect(nextButton).toBeDisabled();

      const prevButton = getPrevButton();
      expect(prevButton).not.toBeDisabled();
    });

    test('When there is only one page, both next and previous buttons should be disabled', async () => {
      axios.post.mockResolvedValue(mockAxiosSinglePageResponse);

      await renderAsyncComponent(Home, { searchParams: { page: '1' } });

      const nextButton = getNextButton();
      expect(nextButton).toBeDisabled();

      const prevButton = getPrevButton();
      expect(prevButton).toBeDisabled();
    });
  });

  describe('Error', () => {
    test('displays correct error message on 500 API failure', async () => {
      axios.post.mockRejectedValueOnce(mockAxiosErrorResponses[500]);

      await expect(
        renderAsyncComponent(Home, { searchParams: { page: '1' } })
      ).rejects.toThrow('Internal server error. Please try again later.');
    });

    test('displays correct error message on 404 API failure', async () => {
      axios.post.mockRejectedValueOnce(mockAxiosErrorResponses[404]);

      await expect(
        renderAsyncComponent(Home, { searchParams: { page: '1' } })
      ).rejects.toThrow('Data not found. Please check the requested resource.');
    });

    test('displays correct error message on 400 API failure', async () => {
      axios.post.mockRejectedValueOnce(mockAxiosErrorResponses[400]);

      await expect(
        renderAsyncComponent(Home, { searchParams: { page: '1' } })
      ).rejects.toThrow('Bad request. Please check your query parameters.');
    });
  });

  describe('Modal', () => {
    test('opens modal when a card is clicked', async () => {
      axios.post.mockResolvedValue(mockAxiosSinglePageResponse);

      await renderAsyncComponent(Home, { searchParams: { page: '1' } });

      const card = screen.getByText('Falcon 1');
      fireEvent.click(card);

      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByText('First successful launch.')).toBeInTheDocument();
    });
  });
});
