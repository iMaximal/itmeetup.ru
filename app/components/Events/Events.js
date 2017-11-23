import React from 'react';
import { lifecycle, withState, compose } from 'recompose';
import styled from 'styled-components';
import theme from '../../theme';
import eventUrls from '../../data/events';
import Event from './Event';

const SectionTitle = styled.div`
  font-family: ${theme.fancyFont};
  letter-spacing: 2px;
  display: flex;
  justify-content: center;
  padding-top: 35px;
`;

const Card = styled.div`
  padding: 20px;
  max-width: 750px;
  margin: 0 auto;
`;

export default
compose(
  withState('events', 'addEvent', []),
  lifecycle({
    componentDidMount() {
      Object.values(eventUrls).map(async (val) => {
        const r = await fetch(val, { mode: 'cors' });
        const { items } = await r.json();
        this.props.addEvent((s) => [
          ...s,
          ...(items || []).filter((event) =>
            event.organizer && +Date.now() < +new Date(event.end.dateTime)
          ),
        ].sort((a, b) => +new Date(a.start.dateTime) - +new Date(b.start.dateTime)));
      });
    },
  })
)(({ events }) => (
  <div>
    <SectionTitle>
      ПРЕДСТОЯЩИЕ СОБЫТИЯ
    </SectionTitle>
    <Card>
      {events.map((e, i) =>
        (<div key={e.id}>
          <Event event={e} />
          {i < events.length - 1 && <hr />}
        </div>)
      )}
    </Card>
  </div>
));
