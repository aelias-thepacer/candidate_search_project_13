

type CandidateCardProps = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
}

const candidtateCard = (
    { login, id, node_id, avatar_url }: CandidateCardProps
)  => {
    return (

        <div className="card" key={id}>
            <img src={avatar_url} alt={login} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{login}</h5>
                <p className="card-text">Node ID: {node_id}</p>
                <p className="card-text">ID: {id}</p>
            </div>
        </div>
    
  );
}

export default candidtateCard;