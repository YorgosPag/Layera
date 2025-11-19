import React from 'react';
import { Link } from 'react-router-dom';
import { BuildingIcon, BriefcaseIcon } from '../../../../packages/icons/src';
import { Box, LayeraHeader, HeaderActionsGroup } from '../../../../packages/layout/src';
import { Text, Heading } from '../../../../packages/typography/src';
import { Colors, PRIMARY_COLORS } from '../../../../packages/tokens/src/colors';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {

  return (
    <Box className={`layera-layout ${styles.container}`}>
      <LayeraHeader
        title="Layera"
        subtitle=""
        variant="rich"
        actions={
          <HeaderActionsGroup>
            {/* Button (+) για προσθήκη νέας καταχώρησης */}
            <button className={`layera-typography ${styles.addButton}`} data-variant="logo">
              +
            </button>
            {/* LOGIN button */}
            <Link to="/login" className={`layera-typography ${styles.linkClean}`} data-variant="button">
              LOGIN
            </Link>
          </HeaderActionsGroup>
        }
      />

      <Box className={`layera-layout ${styles.gradientBackground}`}>
        <Box className={`layera-card ${styles.mainCard}`}>
          <Box className={`layera-layout ${styles.contentWrapper}`}>
            <Heading as="h1" className="layera-typography" data-size="5xl" data-weight="bold" data-color="primary" data-leading="tight">
              Layera
            </Heading>

            {/* 🎨 TEST: Νέα Colors από νέο tokens system */}
            <Box
              className="layera-layout"
              style={{
                backgroundColor: PRIMARY_COLORS[500],
                color: Colors.neutral.white,
                padding: '1rem',
                borderRadius: '8px',
                margin: '1rem 0'
              }}
            >
              <Text className="layera-typography" data-size="lg" data-weight="medium">
                🎯 TEST: Νέο Colors System - Primary Blue {PRIMARY_COLORS[500]}
              </Text>
            </Box>

            <Box className={`layera-layout ${styles.cardsContainer}`}>
              <Link
                to="/marketplace"
                className={`layera-card ${styles.featureCard} ${styles.featureCardBlue}`}
              >
                <Box className={styles.iconContainer}>
                  <BuildingIcon size="xxl" />
                </Box>
                <Heading as="h2" className={`layera-typography ${styles.cardHeading}`} data-size="2xl" data-weight="semibold" data-color="primary" data-leading="snug">Ακίνητα</Heading>
                <Text className="layera-typography" data-size="base" data-color="secondary" data-leading="normal">
                  Αναζήτηση και καταχώρηση ακινήτων με γεωγραφικό εντοπισμό
                </Text>
              </Link>

              <Link
                to="/jobs"
                className={`layera-card ${styles.featureCard} ${styles.featureCardGreen}`}
              >
                <Box className={styles.iconContainer}>
                  <BriefcaseIcon size="xxl" />
                </Box>
                <Heading as="h2" className={`layera-typography ${styles.cardHeading}`} data-size="2xl" data-weight="semibold" data-color="primary" data-leading="snug">Εργασία</Heading>
                <Text className="layera-typography" data-size="base" data-color="secondary" data-leading="normal">
                  Αναζήτηση και προσφορά εργασίας με τοπική στόχευση
                </Text>
              </Link>
            </Box>

            <Box className={styles.loginSection}>
              <Link
                to="/login"
                className={`layera-typography ${styles.linkClean}`}
                data-variant="button"
              >
                Είσοδος / Εγγραφή
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;