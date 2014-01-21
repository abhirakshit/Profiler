import sbt._
import Keys._
import play.Project._

object ApplicationBuild extends Build {

  val appName         = "Profiler"
  val appVersion      = "1.0-SNAPSHOT"

  val appDependencies = Seq(
    // Add your project dependencies here,
    javaCore,
    javaJdbc,
    javaEbean,
     "postgresql"      %   "postgresql"      % "9.1-901.jdbc4",
     "net.sf.flexjson" % "flexjson"          % "2.1"
  )

  val main = play.Project(appName, appVersion, appDependencies).settings(
    // Add your own project settings here
    requireJs += "app.js"
    //requireNativePath := Some("C:\Users\rabhishe\AppData\Roaming\npm\node_modules\requirejs\bin\r.js")
     //requireJsShim += "app.js"
  )

}
