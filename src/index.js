const stackdriver = require('./stackdriver')
const pumpify = require('pumpify')

module.exports.createWriteStream = ({
  logName,
  projectId,
  resource,
  keys
}) => {
  const parseJsonStream = stackdriver.parseJsonStream()
  const toLogEntryStream = stackdriver.toLogEntryStream({ resource, keys })
  const toStackdriverStream = stackdriver.toStackdriverStream({ logName, projectId })
  return pumpify(parseJsonStream, toLogEntryStream, toStackdriverStream)
}
