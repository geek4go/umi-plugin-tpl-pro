/**
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * @file:     为pro定制业务模板
 * @authors:  qiankun <chuck.ql@alibaba-inc.com> (https://work.alibaba-inc.com/work/u/85053)
 * @date      18/11/8
 */
import { readFileSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import globby from 'globby';
import uniq from 'lodash.uniq';
import isRoot from 'path-is-root';
import { chunkName, findJS, optsToArray, endWithSlash } from 'umi-utils';

export default function (api, opts = {}) {
  const { paths, cwd, compatDirname, winPath } = api;
  const isDev = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  // 监听插件配置变化
  api.onOptionChange((newOpts) => {
    opts = newOpts;
    api.rebuildTmpFiles();
  });

  function getModelName(model) {
    const modelArr = winPath(model).split('/');
    return modelArr[modelArr.length - 1];
  }

  api.registerGenerator('pro:table', {
    Generator: require('./model').default(api),
    resolved: join(__dirname, './model'),
  });
}
