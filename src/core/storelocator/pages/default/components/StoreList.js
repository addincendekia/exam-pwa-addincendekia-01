import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const StoreList = ({ storeList }) => (
    <>
        <style jsx>
            {`
                .store-list {
                    border: 2px solid #ddd;
                    padding: 12px;
                    height: calc(50vh + 48px);
                    overflow: auto;
                }
                h3 {
                    margin: 0;
                }
                h3 span {
                    float: right;
                }
                hr {
                    border: 0;
                    border-top: 2px solid #ddd;
                }
            `}
        </style>
        <div className="store-list">
            <h3>
                Store List
                <span>{`( ${storeList.length} )`}</span>
            </h3>
            <List>
                {storeList.map((store, i) => (
                    <>
                        <hr style={{ display: i ? 'block' : 'none' }} />
                        <ListItem key={i} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src={store.baseimage} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={store.store_name}
                                secondary={(
                                    <small>
                                        {store.state}
                                        {', '}
                                        {store.city}
                                        {', '}
                                        {store.address}
                                        <br />
                                        {store.phone}
                                    </small>
                                )}
                            />
                        </ListItem>
                    </>
                ))}
            </List>
        </div>
    </>
);

export default StoreList;
