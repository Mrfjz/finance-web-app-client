import styled from 'styled-components';

const Styles = styled.div`
  padding: 1rem;

  table {
    width: 100%;
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th {
      
    }
    td {
      margin: 0;
      /* padding: 0.5rem; */
      /* border-bottom: 1px solid black; */
      /* border-right: 1px solid black; */
      :last-child {
        border-right: 0;
      }
    }
  }
`

export default Styles;