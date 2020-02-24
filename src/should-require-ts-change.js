/* eslint-disable no-console */
const reactDocs = require('react-docgen');
const _ = require('lodash');

const getAllComponentsDataByDisplayName = file => {
  let result;
  try {
    result = _.sortBy(
      reactDocs.parse(
        file,
        reactDocs.resolver.findAllExportedComponentDefinitions,
        undefined,
        { filename: '' },
      ),
      ['displayName'],
    );
  } catch (ex) {
    // console.log(ex)
    result = undefined;
  }
  return result;
};

const havePropTypesChanged = (masterFileComponentData, prFileComponentData) => {
  const originalPropTypes = _.mapValues(masterFileComponentData.props, props =>
    _.pick(props, ['type', 'required']),
  );
  const changedPropTypes = _.mapValues(prFileComponentData.props, props =>
    _.pick(props, ['type', 'required']),
  );

  console.log('origProps', originalPropTypes);
  console.log('changedProps', changedPropTypes);

  return !_.isEqual(originalPropTypes, changedPropTypes);
};

const shouldRequireTsChange = (fileFromMaster, fileFromPr) => {
  const masterFileComponents = getAllComponentsDataByDisplayName(
    fileFromMaster,
  );
  const prFileComponents = getAllComponentsDataByDisplayName(fileFromPr);

  if (
    (masterFileComponents && !prFileComponents) ||
    (!masterFileComponents && prFileComponents)
  ) {
    return {
      response: true,
      message: 'An exported component was added to, or removed from, the file',
    };
  }
  if (!masterFileComponents && !prFileComponents) {
    return {
      response: false,
    };
  }

  if (masterFileComponents.length !== prFileComponents.length) {
    const message =
      masterFileComponents.length < prFileComponents.length
        ? 'An exported component was added to the file'
        : 'An exported component was deleted from the file';
    return {
      response: true,
      message,
    };
  }

  const invalidComponentIndex = prFileComponents.findIndex(
    (prFileComponent, index) => {
      const masterFileComponent = masterFileComponents[index];
      if (
        !_.isEqual(masterFileComponent.displayName, prFileComponent.displayName)
      ) {
        return true;
      }
      return havePropTypesChanged(masterFileComponent, prFileComponent);
    },
  );

  return invalidComponentIndex < 0
    ? { response: false }
    : {
        response: true,
        message: `PropTypes were changed in ${prFileComponents[invalidComponentIndex].displayName} component`,
      };
};

module.exports = shouldRequireTsChange;

const file1 = `import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Grid.scss';
import pageStyles from '../Page/Page.public.scss';

const containerProps = {
  children: PropTypes.node,
  fluid: PropTypes.bool,
  className: PropTypes.string,
  stretchVertically: PropTypes.bool,
};

const RawContainer = ({ children, fluid, className, stretchVertically }) => (
  <div
    className={classNames(styles.rawContainer, className, {
      [styles.fluidContainer]: fluid,
      [pageStyles.pageStretchContentVertically]: stretchVertically,
    })}
    children={children}
  />
);

RawContainer.propTypes = containerProps;

const Container = ({ children, fluid, className, stretchVertically }) => (
  <div
    className={classNames(styles.wixContainer, className, {
      [styles.fluidContainer]: fluid,
      [pageStyles.pageStretchContentVertically]: stretchVertically,
    })}
    children={children}
  />
);

Container.propTypes = containerProps;

class Columns extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    rtl: PropTypes.bool,
    stretchViewsVertically: PropTypes.bool,
    dataHook: PropTypes.string,
  };

  static defaultProps = {
    stretchViewsVertically: false,
  };

  render() {
    const {
      className,
      rtl,
      stretchViewsVertically,
      dataHook,
      children,
    } = this.props;

    const rowClasses = classNames(styles.row, className, {
      [styles.rtl]: rtl,
      [styles.stretch_vertically_row]: stretchViewsVertically,
    });

    return (
      <div className={rowClasses} data-hook={dataHook} children={children} />
    );
  }
}

class AutoAdjustedColumns extends Component {
  DEFAULT_MAX_SPAN = 12;

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const children = this.props.children;
    const cols = Array.isArray(children) ? children : [children];
    const spanSize = Math.floor(this.DEFAULT_MAX_SPAN / cols.length);

    return (
      <div className={classNames(styles.row, styles.flexContainer)}>
        {cols.map((col, index) => (
          <Col span={spanSize} key={index} children={col} />
        ))}
      </div>
    );
  }
}

class Col extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    span: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rtl: PropTypes.bool,
    xs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    md: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lg: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    xl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dataHook: PropTypes.string,
  };

  static defaultProps = {
    span: 12,
  };

  isVisibleHidden(str) {
    return str === 'hidden' || str === 'visible';
  }

  isLegalCol(numStr) {
    if (numStr && !this.isVisibleHidden(numStr)) {
      const num = Number(numStr);
      return Number.isInteger(num) && num > 0 && num <= 12;
    }
    return false;
  }

  render() {
    const {
      children,
      className,
      span,
      rtl,
      xs,
      sm,
      md,
      lg,
      xl,
      dataHook,
    } = this.props;

    const colClesses = { hey: 'hey'};
    const columnClasses = {hey2: 'hey2'};

    return (
      <div className={columnClasses} data-hook={dataHook} children={children} />
    );
  }
}

export {
  Container,
  RawContainer,
  Columns,
  Columns as Row,
  AutoAdjustedColumns,
  AutoAdjustedColumns as AutoAdjustedRow,
  Col,
};

`;

const file2 = `import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Grid.scss';
import pageStyles from '../Page/Page.public.scss';

const containerProps = {
  children: PropTypes.node,
  fluid: PropTypes.bool,
  className: PropTypes.string,
  stretchVertically: PropTypes.bool,
};

const RawContainer = ({ children, fluid, className, stretchVertically }) => (
  <div
    className={classNames(styles.rawContainer, className, {
      [styles.fluidContainer]: fluid,
      [pageStyles.pageStretchContentVertically]: stretchVertically,
    })}
    children={children}
  />
);

RawContainer.propTypes = containerProps;

const Container = ({ children, fluid, className, stretchVertically }) => (
  <div
    className={classNames(styles.wixContainer, className, {
      [styles.fluidContainer]: fluid,
      [pageStyles.pageStretchContentVertically]: stretchVertically,
    })}
    children={children}
  />
);

Container.propTypes = containerProps;

class Columns extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    rtl: PropTypes.bool,
    stretchViewsVertically: PropTypes.bool,
    dataHook: PropTypes.string,
  };

  static defaultProps = {
    stretchViewsVertically: false,
  };

  render() {
    const {
      className,
      rtl,
      stretchViewsVertically,
      dataHook,
      children,
    } = this.props;

    const rowClasses = classNames(styles.row, className, {
      [styles.rtl]: rtl,
      [styles.stretch_vertically_row]: stretchViewsVertically,
    });

    return (
      <div className={rowClasses} data-hook={dataHook} children={children} />
    );
  }
}

class AutoAdjustedColumns extends Component {
  DEFAULT_MAX_SPAN = 12;

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const children = this.props.children;
    const cols = Array.isArray(children) ? children : [children];
    const spanSize = Math.floor(this.DEFAULT_MAX_SPAN / cols.length);

    return (
      <div className={classNames(styles.row, styles.flexContainer)}>
        {cols.map((col, index) => (
          <Col span={spanSize} key={index} children={col} />
        ))}
      </div>
    );
  }
}

class Col extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    span: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rtl: PropTypes.bool,
    xs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    md: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lg: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    xl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dataHook: PropTypes.string,
  };

  static defaultProps = {
    span: 12,
  };

  isVisibleHidden(str) {
    return str === 'hidden' || str === 'visible';
  }

  isLegalCol(numStr) {
    if (numStr && !this.isVisibleHidden(numStr)) {
      const num = Number(numStr);
      return Number.isInteger(num) && num > 0 && num <= 12;
    }
    return false;
  }

  render() {
    const {
      children,
      className,
      span,
      rtl,
      xs,
      sm,
      md,
      lg,
      xl,
      dataHook,
    } = this.props;

    const colClesses = { hey: 'hey'};
    const columnClasses = {hey2: 'hey2'};

    return (
      <div className={columnClasses} data-hook={dataHook} children={children} />
    );
  }
}

export {
  Container,
  RawContainer,
  Columns,
  Columns as Row,
  AutoAdjustedColumns,
  AutoAdjustedColumns as AutoAdjustedRow,
  Col,
};
`;

console.log(shouldRequireTsChange(file1, file2));
