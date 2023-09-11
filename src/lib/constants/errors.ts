export const errorsMap = {
  /** User */
  USER_NOT_LOGGED_IN: 'User is not logged in',
  USER_NOT_AUTHORIZED: 'User is not authorized for this action',

  /** Common Errors */
  UNKNOWN_ERROR: 'Unknown error',
  DOCUMENT_NOT_FOUND: 'Document is not found',
  HOUSING_NOT_FOUND: 'Housing is not found',
  HOUSINGID_INVALID_FORMAT: 'HousingID has invalid format',

  /** Add monthly data field/counter */
  MONTH_REQUIRED: 'Month is required for this action',
  DATA_REQUIRED: 'Data is required for this action',
  HOUSINGID_NOT_FOUND: 'ID of the housing is not found',
  FIELD_NOT_RELATED_TO_HOUSING: 'Field and Housing are not related',
  COUNTER_NOT_RELATED_TO_HOUSING: 'Counter and Housing are not related',
  FIELD_ALREADY_HAS_DATA: 'The data can not be added. The field already has this data',
  COUNTER_ALREADY_HAS_DATA: 'The data can not be added. The counter already has this data',

  /** Add field */
  FIELD_NAME_REQUIRED: 'Field name is required',
  HOUSINGID_REQUIRED: 'Housing ID is required',
}
