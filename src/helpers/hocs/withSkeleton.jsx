import Skeleton from "../../components/Skeleton/Skeleton"

function withSkeleton (Componet, type, count) {
	return function WithSkeleton(props) {
		const {isLoading, ...restProps} = props
		if(isLoading) {
			return <Skeleton type={type} count={count} />;
		}
		return <Componet {...restProps} />
	};
}

export default withSkeleton;