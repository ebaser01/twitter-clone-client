import { Redirect, Route, RouteProps} from 'react-router-dom';
import { useAppSelector } from '../common/hooks';



const PrivateRoute = ({component: Component, ...rest}: RouteProps) => {
    const isAuth = useAppSelector(state=> state.user.isAuth);

    if (!Component) return null;

    return(
        <Route
        {...rest} render={props=> {
            if(!isAuth){

                return <Redirect to={{pathname: '/login', state: { referrer: props.location}}} />
            }
            else{

                return <Component {...props}/>
            }
        }}
        />
        
    );

}


export default PrivateRoute;



