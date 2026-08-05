import { RepositoryListContainer } from '../../components/RepositoryList/RepositoryList'
import { render, within } from '@testing-library/react-native';
import { NativeRouter } from 'react-router-native';
import { Provider as PaperProvider } from 'react-native-paper';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = await render(
        <NativeRouter>
          <PaperProvider>
            <RepositoryListContainer 
              repositories={repositories}
              selectedOrder="latest"
              setSelectedOrder={jest.fn()}
              searchQuery=""
              setSearchQuery={jest.fn()} 
            />
          </PaperProvider>
        </NativeRouter>
      );

      const repositoryItems = getAllByTestId('repositoryItem');
      expect(repositoryItems).toHaveLength(2);

      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      // first repository item
      expect(within(firstRepositoryItem).getByText('jaredpalmer/formik')).toBeTruthy(); // name
      expect(within(firstRepositoryItem).getByText('Build forms in React, without the tears')).toBeTruthy(); // description
      expect(within(firstRepositoryItem).getByText('TypeScript')).toBeTruthy(); // language
      expect(within(firstRepositoryItem).getByText('1.6k')).toBeTruthy(); // forks
      expect(within(firstRepositoryItem).getByText('21.9k')).toBeTruthy(); // stargazers
      expect(within(firstRepositoryItem).getByText('88')).toBeTruthy(); // rating
      expect(within(firstRepositoryItem).getByText('3')).toBeTruthy(); // review

      // second repository item
      expect(within(secondRepositoryItem).getByText('async-library/react-async')).toBeTruthy();
      expect(within(secondRepositoryItem).getByText('Flexible promise-based React data loader')).toBeTruthy();
      expect(within(secondRepositoryItem).getByText('JavaScript')).toBeTruthy();
      expect(within(secondRepositoryItem).getByText('69')).toBeTruthy();
      expect(within(secondRepositoryItem).getByText('1.8k')).toBeTruthy();
      expect(within(secondRepositoryItem).getByText('72')).toBeTruthy();
      expect(within(secondRepositoryItem).getByText('3')).toBeTruthy();

    });
  });
});