import memoizeOne from 'memoize-one';
import { useId } from 'react';

import { PanelProps } from '@grafana/data';
import { Trans } from '@grafana/i18n';

import { useLinks } from '../../../features/explore/utils/links';

import { NodeGraph } from './NodeGraph';
import { Options as NodeGraphOptions } from './panelcfg.gen';
import { getNodeGraphDataFrames } from './utils';

export const NodeGraphPanel = ({ width, height, data, options }: PanelProps<NodeGraphOptions>) => {
  const getLinks = useLinks(data.timeRange);
  const panelId = useId();

  if (!data || !data.series.length) {
    return (
      <div className="panel-empty">
        <p>
          <Trans i18nKey="nodeGraph.node-graph-panel.no-data-found-in-response">No data found in response</Trans>
        </p>
      </div>
    );
  }

  const memoizedGetNodeGraphDataFrames = memoizeOne(getNodeGraphDataFrames);
  return (
    <div style={{ width, height }}>
      <NodeGraph
        dataFrames={memoizedGetNodeGraphDataFrames(data.series, options)}
        getLinks={getLinks}
        panelId={panelId}
        zoomMode={options.zoomMode}
        layoutAlgorithm={options.layoutAlgorithm}
      />
    </div>
  );
};
