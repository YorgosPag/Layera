    <BaseCard
      title={title || t('addressDetails')}
      actions={cardActions}
      className={`address-breakdown-card ${finalConfig.className || ''}`}
      onClick={onClick ? () => onClick({} as React.MouseEvent<HTMLDivElement>) : undefined}
      {...(style && { style })}
    >
      {error && (
        <Box className="error-message">
          {error}
        </Box>
      )}

      {boundaryError && (
        <Box className="boundary-error">
          {boundaryError}
        </Box>
      )}

      {/* Instruction text μία φορά στην κορυφή */}
      {!isLoading && visibleComponents.some(c => c.clickable) && finalConfig.enableBoundarySearch && (
        <Box className="la-instruction-text">
          {t('clickToShowBoundary')}
        </Box>
      )}

      <Box className={`address-components layout-${finalConfig.layout}`}>
        {isLoading ? (
          <Box className="loading-state">
            Loading...
          </Box>
        ) : (
          visibleComponents.map(renderComponent)
        )}
      </Box>

      {components.length > visibleComponents.length && (
        <Box className="components-overflow">
          +{components.length - visibleComponents.length} more components
        </Box>
      )}
    </BaseCard>
  );
}
