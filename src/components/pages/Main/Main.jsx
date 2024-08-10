// import NewsBanner from '../../NewsBanner/NewsBanner';
import styles from './styles.module.css'
import LatestNews from '../../LatestNews/LatestNews';
import NewsByFilters from '../../NewsByFilters/NewsByFilters';

const Main = () => {


  return (
	<div>
		<main className={styles.main} >
			<LatestNews  />
			<NewsByFilters />

		</main>
	</div>
  )
}

export default Main;
