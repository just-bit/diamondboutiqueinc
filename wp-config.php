<?php
define( 'WP_CACHE', true ); // Added by WP Rocket

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'diamondboutiqueinc' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );


/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '*58k1AM{:E^2)N.D2t%7P2a*2{(3DIImt!7%tooyA.D[DHR({N2ilFU{lCLvo;UD' );
define( 'SECURE_AUTH_KEY',  '~X%e(Fwj^(6cu}?pA)yz<]Ytd|Nszu2%5utkk!XZD%&e#8CEy94*gkg%wy1x.cYR' );
define( 'LOGGED_IN_KEY',    'lTW5bZ+o2,`;CYhbY[Y;]7u<;aycL1T}N:saSd)NDb-N$x$ nK!N$Amyj,e:Em6<' );
define( 'NONCE_KEY',        'v42PqCIl[)-XyJ@E6_ IIaU(Y/|O@rjVX[2@rsE#A_R*v34`hmR5nCUWw!*ubeD$' );
define( 'AUTH_SALT',        '0{$i@mowhLlST6>Lk_]DNWosk.2]HlQ6TbS>1(g_4723Za0()gUMu<RN_s}NC+wz' );
define( 'SECURE_AUTH_SALT', 'J&*P]i+vKL:s&7W[*^ph%%54+(2N^Z$~-HwTfB3vgXodd3.(xGqOOj)&!mJ;9+If' );
define( 'LOGGED_IN_SALT',   '@]z/Me7+*7Koz;#JM|D0OY3Wxh$TKNkEpW1%x?hEs8CkkXT2vt$@Pf%b8OW?r_Od' );
define( 'NONCE_SALT',       'R>C5,pzAu0^?S>=B0gP6:,!/h`MgXo26q3|05^4Q$8rI<csB:hl}cPtym~P{iAw~' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
if(!defined('WP_DEBUG')){
    define( 'WP_DEBUG', false );
}

/* Add any custom values between this line and the "stop editing" line. */





// Enable WP_DEBUG mode
if(!defined('WP_DEBUG')){
    define( 'WP_DEBUG', false );
}

// Enable Debug logging to the /wp-content/debug.log file
define('WP_DEBUG_LOG', true);

// Disable display of errors and warnings 
define('WP_DEBUG_DISPLAY', false);
@ini_set('display_errors',0);

// Use dev versions of core JS and CSS files (only needed if you are modifying these core files)
define('SCRIPT_DEBUG', true);
if(!defined('ORGANIZATION_EMAIL')){
    define( 'ORGANIZATION_EMAIL', 'sam.karatshop@gmail.com' );
}




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
