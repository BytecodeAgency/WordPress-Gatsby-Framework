=== WordPress Framework Plugin ===
Contributors: (this should be a list of wordpress.org userid's)
Donate link: https://bytecode.nl
Tags: framework, functionality
Requires at least: 3.0.1
Tested up to: 3.4
Stable tag: 5.2.2
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

Plugin for headless WordPress with a React compiler.

== Description ==



== Installation ==

This plugin requires Advanced Custom Fields PRO.

== Endpoints ==

POST to wp-json/form/new with JSON: {
  "name": "fill name here"
  "email": "fill email here"
  "message": "fill message here"
}

== Frequently Asked Questions ==

= How does ACF version control work with the GUI? =

When updating ACF through the GUI of a WordPress installation, this plugin's acf folder will update the JSON files. On another installation, when the JSON file has been updated (recognized by a higher "modification" value), you have the option to synchronize in the ACF GUI under "synchronize" in the group overview.

== Changelog ==

= 0.3.0

* Fix topbar, footer and menu JSON
* Add sizes for Pageblocks
* Add POST endpoint for new forms

= 0.2.0 =

* Add first parser implementation

= 0.1.2 =

* Add post type for forms
* Improve code style
* Add ACF theme fields

= 0.1.1 =

* Add ACF synchronization
* Add ACF option pages
* Add content blocks in ACF

* Strip WordPress from unused interfaces

= 0.1.0 =
* First version of the plugin, intialized with WordPress BoilerPlate
