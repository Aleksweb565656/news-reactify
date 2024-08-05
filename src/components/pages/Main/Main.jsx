import NewsBanner from '../../NewsBanner/NewsBanner';
import styles from './styles.module.css'
import { getCategories, getNews } from '../../../api/apiNews';
import NewsList from '../../NewsList/NewsList';
import Pagination from '../../Pagination/Pagination';
import Categories from '../../Categories/Categories';
import Search from '../../Search/Search';
import { useDebounce } from '../../../helpers/hooks/useDebounce';
import { PAGE_SIZE, TOTAL_PAGES } from '../../../constants/constants';
import { useFetch } from '../../../helpers/hooks/useFetch';
import { useFilters } from '../../../helpers/hooks/useFilters';

const Main = () => {
	const {filters, changeFilters} = useFilters({
		page_number:1,
		page_size:PAGE_SIZE,
		category: null,
		keywords: '',
	})

	const debouncedKeywords = useDebounce(filters.keywords, 1500);

	const {data, isLoading} = useFetch(getNews, {
					...filters,
					keywords: debouncedKeywords,
				} )
	
	const {data: dataCategories} = useFetch(getCategories, )

	const handleNextPage = () => {
		if(filters.page_number < TOTAL_PAGES) {
			changeFilters('page_number',filters.page_number + 1)
		}
	}
	const handlePreviousPage = () => {
		if(filters.page_number > 1) {
			changeFilters('page_number',filters.page_number - 1)
		}
	}
	const handlePageClick = (pageNumber) => {
		changeFilters('page_number',pageNumber)
	}
  return (
	<div>
		<main className={styles.main} >
			{dataCategories ? <Categories 
				categories={dataCategories.categories} 
				selectedCategory={filters.category} 
				setSelectedCategory={(category) => changeFilters('category',category)} 
			/> : null}
			<Search 
				keywords={filters.keywords} 
				setKeywords={(keywords) => changeFilters('keywords',keywords)} 
			/>
			
			<NewsBanner 
				isLoading={isLoading} 
				item={data && data.news && data.news[0]} 
			/>

			<Pagination 
				handleNextPage={handleNextPage} 
				handlePreviousPage={handlePreviousPage} 
				handlePageClick={handlePageClick} 
				totalPages={TOTAL_PAGES} 
				currentPage={filters.page_number}
			/>

			<NewsList 
				isLoading={isLoading} 
				news={data?.news} 
			/>

			<Pagination 
				handleNextPage={handleNextPage} 
				handlePreviousPage={handlePreviousPage} 
				handlePageClick={handlePageClick} 
				totalPages={TOTAL_PAGES} 
				currentPage={filters.page_number}
			/>
		</main>
	</div>
  )
}

export default Main;
