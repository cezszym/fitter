import React from 'react';

class PostsList extends React.Component {
  render() {
    return (
      <div>
        <h2>Lista postów</h2>
        <ul>
          {this.props.list.map((e, index) => (
            <li key={index}>
              <p>{e.date ? e.date.toDate().toDateString() : 'no date'}</p>
              <p>{e.content ? e.content : 'no content'}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostsList;
