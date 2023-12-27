const Info = ({ variant, text }) => (
    <div>
        <div className="alert m-15" severity={variant}>
            {text}
        </div>
    </div>
);

export default Info;
